import { format } from 'date-fns';
/* eslint-disable-next-line */
export function dateToString(date) {
  if (!date) { return ''; }
  return format(date, 'yyyy年M月d日　HH時mm分');
}
export function translateErrors(code) {
  const error = { title: 'エラー', description: '時間をおいてお試しください。' };
  switch (code) {
    case 'auth/invalid-email':
      error.description = 'メールアドレスが不正です。';
      break;
    case 'auth/user-disable':
      error.description = 'アカウントが無効です。';
      break;
    case 'auth/user-not-found':
      error.description = 'アカウントが存在しません。';
      break;
    case 'auth/wrong-password':
      error.description = 'パスワードが間違っています。';
      break;
    case 'auth/operation-not-allowed':
      error.description = '開発者にお問い合わせください。';
      break;
    case 'auth/weak-password':
      error.description = 'パスワードが短すぎます。';
      break;
    case 'auth/email-already-use':
      error.description = 'メールアドレスが使用されています。';
      break;
    default:
  }
  return error;
}
