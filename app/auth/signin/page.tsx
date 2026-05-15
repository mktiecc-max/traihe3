'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SignInContent() {
  const params = useSearchParams()
  const error = params.get('error')

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--admin-bg)',
      fontFamily: 'var(--font)',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '40px 36px',
        boxShadow: '0 20px 50px -15px rgba(15,23,42,.18)',
        width: '100%',
        maxWidth: 380,
        textAlign: 'center',
      }}>
        <div style={{
          width: 52,
          height: 52,
          background: 'linear-gradient(135deg,#001F86,#002399)',
          borderRadius: 14,
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 20px',
          color: '#FFEF62',
          fontWeight: 900,
          fontSize: 24,
        }}>
          U
        </div>
        <h1 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: '#0F1729' }}>
          UCMAS Admin
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: 14, color: '#6b7390' }}>
          Đăng nhập để quản lý trại hè 2026
        </p>

        {error && (
          <div style={{
            background: '#ffe9e6',
            border: '1px solid rgba(212,15,0,.3)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 18,
            fontSize: 13,
            color: '#D40F00',
          }}>
            {error === 'AccessDenied'
              ? 'Email không được phép truy cập. Liên hệ admin.'
              : 'Đăng nhập thất bại. Vui lòng thử lại.'}
          </div>
        )}

        <button
          onClick={() => signIn('google', { callbackUrl: '/admin' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            width: '100%',
            padding: '12px 20px',
            border: '1.5px solid #e4e7f0',
            borderRadius: 10,
            background: '#fff',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 600,
            color: '#0f1729',
            transition: 'background .15s, border-color .15s',
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1' }}
          onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e4e7f0' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Đăng nhập với Google
        </button>

        <p style={{ marginTop: 20, fontSize: 12, color: '#9099b5' }}>
          Chỉ email được cấp phép mới có thể đăng nhập.
        </p>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  )
}
