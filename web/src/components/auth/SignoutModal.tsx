import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Modal, ModalButton } from '@/components/ui/Modal'

export function SignoutModal() {
    const { isSignoutModalOpen, closeSignoutModal, logout, isSubmitting, user } = useAuth()
    const navigate = useNavigate()

    const handleConfirm = async () => {
        try {
            await logout()
            closeSignoutModal()
            navigate('/')
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    return (
        <Modal
            open={isSignoutModalOpen}
            onClose={closeSignoutModal}
            busy={isSubmitting}
            tone="danger"
            eyebrow="Account"
            title="Sign out?"
            description="You'll need to sign in again to submit code and join contests."
            footer={
                <>
                    <ModalButton disabled={isSubmitting} onClick={closeSignoutModal}>
                        Cancel
                    </ModalButton>
                    <ModalButton variant="danger" disabled={isSubmitting} onClick={handleConfirm}>
                        {isSubmitting ? 'Signing out...' : 'Sign out'}
                    </ModalButton>
                </>
            }
        >
            {user && (
                <div className="flex items-center gap-2.5 rounded-[4px] bg-[#f8fafc] dark:bg-[#252423] px-3 py-2.5">
                    <div className="h-7 w-7 rounded-full bg-[#e2e8f0] dark:bg-[#333333] flex items-center justify-center text-[11px] font-semibold overflow-hidden shrink-0">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt=""
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            (user.name || 'U')[0].toUpperCase()
                        )}
                    </div>
                    <span className="text-xs font-medium truncate">{user.name || 'Signed in'}</span>
                </div>
            )}
        </Modal>
    )
}
