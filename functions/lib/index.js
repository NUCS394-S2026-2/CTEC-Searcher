'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendSignInLink = void 0;
const admin = __importStar(require('firebase-admin'));
const firebase_functions_1 = require('firebase-functions');
const params_1 = require('firebase-functions/params');
const https_1 = require('firebase-functions/v2/https');
const resend_1 = require('resend');
(0, firebase_functions_1.setGlobalOptions)({ maxInstances: 10 });
admin.initializeApp();
const resendApiKey = (0, params_1.defineSecret)('RESEND_API_KEY');
exports.sendSignInLink = (0, https_1.onCall)(
  { secrets: [resendApiKey] },
  async (request) => {
    const email = request.data.email;
    if (!email || !email.toLowerCase().endsWith('@u.northwestern.edu')) {
      throw new https_1.HttpsError(
        'invalid-argument',
        'Only @u.northwestern.edu emails are allowed.',
      );
    }
    const continueUrl = request.data.continueUrl;
    const link = await admin.auth().generateSignInWithEmailLink(email, {
      url: continueUrl,
      handleCodeInApp: true,
    });
    const resend = new resend_1.Resend(resendApiKey.value());
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
  },
);
//# sourceMappingURL=index.js.map
