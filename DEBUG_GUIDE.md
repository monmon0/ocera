# Debug Guide - Current Issues & Solutions

## 🚀 Quick Start

The app is now configured with:

- ✅ Loading screen functionality
- ✅ Language switching (English/Vietnamese)
- ✅ Fixed NextAuth API routes
- ✅ Proper locale routing

## 🎯 Current Setup Status

### 1. **Working Features:**

- Loading screen with context
- Language switcher in navigation
- Internationalization setup
- API routes accessible

### 2. **Current Configuration:**

- **Root URL**: Redirects to `/en` (English by default)
- **Dashboard**: Available at `/en/dashboard`
- **Language Routes**: `/en/*` and `/vi/*`
- **API Routes**: `/api/auth/*` (excluded from locale routing)

### 3. **Testing URLs:**

- **English**: `http://localhost:3000/en`
- **Vietnamese**: `http://localhost:3000/vi`
- **Dashboard**: `http://localhost:3000/en/dashboard`
- **Test Page**: `http://localhost:3000/en/test`

## 🔧 Fixed Issues

### NextAuth CLIENT_FETCH_ERROR:

- ✅ Fixed middleware to exclude `/api` routes
- ✅ Updated auth configuration for locale routing
- ✅ Temporarily disabled Supabase (using JWT strategy)

### Translation Context Error:

- ✅ Proper locale layout structure
- ✅ Root page redirects to locale routes
- ✅ Error boundaries added

## 🎨 Features Available

### Loading Screen:

```tsx
import { useCustomLoading } from "@/hooks/use-page-loading";

const { showSignInLoading, hideLoading } = useCustomLoading();
// Use for custom loading states
```

### Language Switching:

- Available in navigation bar
- Automatic URL updates
- Persistent across sessions

### Translations:

```tsx
import { useTranslations } from "next-intl";

const t = useTranslations("Dashboard");
const text = t("welcome"); // Gets localized text
```

## 🔄 If You Still See Errors:

1. **Clear Browser Cache**: Hard refresh (Ctrl+F5)
2. **Check URL**: Make sure you're accessing `/en/` routes
3. **Restart Server**: If needed, restart the dev server
4. **Check Console**: Look for specific error messages

## 🌐 Language Support

### English (/en):

- Complete UI translations
- Default language

### Vietnamese (/vi):

- Complete UI translations
- Proper Vietnamese text

## 🎯 Next Steps for Full Supabase:

1. Set up real Supabase project
2. Update environment variables
3. Re-enable Supabase adapter in `lib/auth.ts`
4. Run database schema from `supabase-schema.sql`

## 📱 How to Test:

1. **Visit**: `http://localhost:3000/en/dashboard`
2. **Check Loading**: Should show animated loading screen
3. **Test Language**: Click language switcher in nav
4. **Check Translation**: UI should change to Vietnamese

The app should now work without CLIENT_FETCH_ERROR and translation context errors! 🎉
