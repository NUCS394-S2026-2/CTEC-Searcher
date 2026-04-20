import * as admin from 'firebase-admin';
import { setGlobalOptions } from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { Resend } from 'resend';

setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();

const resendApiKey = defineSecret('RESEND_API_KEY');

export const sendSignInLink = onCall({ secrets: [resendApiKey] }, async (request) => {
  const email = request.data.email;

  if (!email || !email.toLowerCase().endsWith('@u.northwestern.edu')) {
    throw new HttpsError(
      'invalid-argument',
      'Only @u.northwestern.edu emails are allowed.',
    );
  }

  const continueUrl = request.data.continueUrl;

  const link = await admin.auth().generateSignInWithEmailLink(email, {
    url: continueUrl,
    handleCodeInApp: true,
  });

  const resend = new Resend(resendApiKey.value());

  await resend.emails.send({
    from: 'CTEC Searcher <noreply@ctec-searcher.app>',
    to: email,
    subject: 'Your CTEC Searcher sign-in link',
    html: `
        <p>Hi,</p>
        <p>Click the link below to sign in to CTEC Searcher:</p>
        <p><a href="${link}">Sign in to CTEC Searcher</a></p>
        <p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
      `,
  });

  return { success: true };
});
