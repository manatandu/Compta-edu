import { useUser } from '@/lib/userContext'
import React, { useState, useRef, useEffect } from 'react'
import BackButton from '@/components/BackButton'
import { onMessagesSnapshot, saveMessageAsync, getUsersAsync } from '@/lib/db-firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send, MessageSquare, MessagesSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ChatPage() {
  const currentUser = useUser()
  const [allUsersRaw, setAllUsersRaw] = React.useState<any[]>([])
  React.useEffect(() => { getUsersAsync().then(setAllUsersRaw).catch(() => {}) }, [])
  const allUsers = allUsersRaw.filter(u => u.id !== currentUser?.id && u.actif)

  // Filtrage des contacts selon le rôle :
  // - Admin/prof/assistant : voit uniquement les étudiants qu'il a créés
  // - Étudiant : voit l'admin qui a créé son code d'accès EN PREMIER, puis les autres staff
  const isStaff = ['admin', 'professeur', 'assistant'].includes(currentUser?.role || '')
  const isMainAdmin = currentUser?.role === 'admin'
  const createdByRef = (currentUser as any)?.createdBy as string | undefined

  const users = isStaff
    ? allUsers.filter(u => {
        if (u.role !== 'etudiant') return false
        if (isMainAdmin) return true  // l'admin voit tous les étudiants
        const cb = (u as any).createdBy
        if (!cb) return true
        return cb === currentUser?.id || cb === (currentUser as any)?.username
      })
    : (() => {
        const staff = allUsers.filter(u => ['admin', 'professeur', 'assistant'].includes(u.role))
        if (!createdByRef) return staff
        // Mettre l'admin créateur en premier
        const creator = staff.find(u => u.id === createdByRef || u.username === createdByRef)
        if (!creator) return staff
        return [creator, ...staff.filter(u => u.id !== creator.id)]
      })()

  const [selectedUserId, setSelectedUserId] = useState<string>('')

  // Pré-sélectionner l'admin créateur du code d'accès dès que les users sont chargés
  React.useEffect(() => {
    if (!currentUser || isStaff || users.length === 0 || selectedUserId) return
    if (createdByRef) {
      const creator = users.find(u => u.id === createdByRef || u.username === createdByRef)
      if (creator) setSelectedUserId(creator.id)
    }
  }, [users.length, isStaff])
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!currentUser?.id) return
    const unsub = onMessagesSnapshot(currentUser.id, (msgs) => setMessages(msgs))
    return () => unsub()
  }, [currentUser?.id])

  // Uniquement conversations privées entre currentUser et selectedUserId
  const filteredMessages = selectedUserId
    ? messages.filter(m =>
        (m.expediteurId === currentUser?.id && m.destinataireId === selectedUserId) ||
        (m.expediteurId === selectedUserId && m.destinataireId === currentUser?.id)
      )
    : []

  const sendMessage = () => {
    if (!newMessage.trim() || !currentUser || !selectedUserId) return
    saveMessageAsync({
      expediteurId: currentUser.id,
      destinataireId: selectedUserId,
      contenu: newMessage.trim(),
      date: new Date().toISOString(),
      lu: false,
    }).catch(console.error)
    setNewMessage('')
  }

  const getUserName = (id: string) => {
    const u = [...users, currentUser!].find(u => u?.id === id)
    return u ? `${u.nom} ${u.prenom || ''}`.trim() : id
  }

  const getUserInitials = (id: string) => {
    const u = [...users, currentUser!].find(u => u?.id === id)
    return ((u?.nom?.[0] || '') + (u?.prenom?.[0] || '')).toUpperCase()
  }

  return (
    <div className="flex flex-col gap-4 animate-fadeIn pb-4">

      {/* ── Bouton retour ── */}
      <BackButton />

      {/* ── Header Banner Animé ── */}
      <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-6 py-4">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
              <MessagesSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">Messagerie</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Communication entre étudiants et professeurs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        {/* Sidebar */}
        <div className="md:w-56 shrink-0">
          <Card className="border-border">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Conversations</CardTitle></CardHeader>
            <CardContent className="pt-0 px-2 pb-2">
              {users.length === 0 && (
                <p className="text-xs text-muted-foreground px-3 py-2 italic">Aucun contact disponible.</p>
              )}
              {users.map(u => (
                <button
                  key={u.id}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-left transition-colors',
                    selectedUserId === u.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  )}
                  onClick={() => setSelectedUserId(u.id)}
                >
                  <Avatar className="h-6 w-6 shrink-0">
                    <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                      {((u.nom?.[0] || '') + (u.prenom?.[0] || '')).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{u.nom} {u.prenom}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col" style={{ minHeight: '420px' }}>
          <Card className="border-border flex flex-col h-full">
            <CardHeader className="pb-2 border-b border-border shrink-0">
              <CardTitle className="text-sm">
                {selectedUserId ? getUserName(selectedUserId) : 'Sélectionnez un contact'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pt-4 pb-2 space-y-3">
              {!selectedUserId ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Sélectionnez un contact pour commencer.</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucun message. Soyez le premier à écrire !</p>
                </div>
              ) : (
                filteredMessages.map(m => {
                  const isMe = m.expediteurId === currentUser?.id
                  return (
                    <div key={m.id} className={cn('flex gap-2', isMe ? 'justify-end' : 'justify-start')}>
                      {!isMe && (
                        <Avatar className="h-7 w-7 shrink-0">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {getUserInitials(m.expediteurId)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={cn('max-w-xs', isMe ? 'items-end' : 'items-start')}>
                        {!isMe && (
                          <p className="text-xs text-muted-foreground mb-0.5">{getUserName(m.expediteurId)}</p>
                        )}
                        <div className={cn(
                          'px-3 py-2 rounded-lg text-sm',
                          isMe
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-muted text-foreground rounded-tl-none'
                        )}>
                          {m.contenu}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(m.date).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={bottomRef} />
            </CardContent>
            <div className="border-t border-border p-3 shrink-0">
              {!selectedUserId ? (
                <p className="text-xs text-center text-muted-foreground py-1">Sélectionnez un contact pour écrire un message.</p>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Écrire un message..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    className="flex-1"
                    autoComplete="off"
                  />
                  <Button size="icon" onClick={sendMessage} disabled={!newMessage.trim()} title="Envoyer (Entrée)">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
