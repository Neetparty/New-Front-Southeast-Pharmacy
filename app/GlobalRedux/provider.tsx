'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { I18nextProvider } from 'react-i18next'
import i18n from '@/translate/i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense } from 'react';
import { Circular } from '../component/Loading/Circular';
const clientId = process.env.NEXT_PUBLIC_APP_GOOGLE_OAUTH

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<Circular loading />}>
                    <GoogleOAuthProvider clientId={clientId as string}>
                        {children}
                    </GoogleOAuthProvider>
                </Suspense>
            </I18nextProvider>
        </Provider>
    )
}