# 📐 Text Color Rule - Maximum Contrast

## The Rule

### Simple & Clear:
```
Dark Background → White Text
White Background → Black Text
```

---

## Implementation Guide

### 1. Page-Level (Dark Background)
**Background**: `#0f172a` (slate-900) - DARK
**Text Colors**:
- Headings: `text-white`
- Body text: `text-slate-300` or `text-slate-400`
- Labels: `text-slate-400`
- Links: `text-primary-400` or `text-blue-400`

**Example**:
```jsx
<div className="min-h-screen"> {/* Dark background */}
  <h1 className="text-white">Page Title</h1>
  <p className="text-slate-300">Description text</p>
</div>
```

---

### 2. Cards/Blocks (White Background)
**Background**: `white` - WHITE
**Text Colors**:
- Headings: `text-slate-900`
- Body text: `text-slate-600`
- Labels: `text-slate-700`
- Links: `text-blue-600`

**Example**:
```jsx
<div className="card"> {/* White background */}
  <h3 className="text-slate-900">Card Title</h3>
  <p className="text-slate-600">Card description</p>
</div>
```

---

### 3. Gradient Backgrounds
**Background**: Gradient (usually dark) - DARK
**Text Colors**: `text-white`

**Example**:
```jsx
<div className="bg-gradient-to-r from-primary-600 to-accent-600">
  <h2 className="text-white">CTA Title</h2>
  <p className="text-white opacity-90">CTA text</p>
</div>
```

---

## Color Palette

### Dark Backgrounds Use:
- `text-white` - Pure white for headings
- `text-slate-100` - Very light gray
- `text-slate-200` - Light gray
- `text-slate-300` - Medium light gray
- `text-slate-400` - Muted light gray

### White Backgrounds Use:
- `text-slate-900` - Almost black for headings
- `text-slate-800` - Very dark gray
- `text-slate-700` - Dark gray for labels
- `text-slate-600` - Medium dark gray for body
- `text-slate-500` - Muted dark gray

---

## NO Dark Mode Variants Needed!

Since we have:
- **Page background**: Always dark
- **Cards**: Always white

We DON'T need `dark:` variants:

### ❌ Wrong:
```jsx
<div className="card">
  <h3 className="text-slate-900 dark:text-white">Title</h3>
</div>
```

### ✅ Right:
```jsx
<div className="card">
  <h3 className="text-slate-900">Title</h3>
</div>
```

---

## Component Checklist

### Page Headers (Dark BG):
- [x] Use `text-white` for h1
- [x] Use `text-slate-300` for descriptions

### Cards (White BG):
- [x] Use `text-slate-900` for headings
- [x] Use `text-slate-600` for body text
- [x] Remove all `dark:` variants

### Stats/Numbers (White Cards):
- [x] Use `text-slate-900` for numbers
- [x] Use `text-slate-600` for labels

### Buttons:
- Primary: White text (on gradient)
- Secondary: Dark text (on white)

---

## Quick Reference

| Element | Background | Text Color |
|---------|-----------|------------|
| Page Title | Dark | `text-white` |
| Page Description | Dark | `text-slate-300` |
| Card Heading | White | `text-slate-900` |
| Card Body | White | `text-slate-600` |
| Card Label | White | `text-slate-700` |
| Navbar Links | Dark | `text-slate-300` |
| Footer Text | Dark | `text-slate-400` |
| Button (Primary) | Gradient | `text-white` |
| Button (Secondary) | White | `text-primary-600` |

---

## Result

**Perfect contrast everywhere:**
- ✅ Easy to read
- ✅ Accessible
- ✅ Professional
- ✅ Consistent
- ✅ No confusion

**The rule is simple: Match text brightness to background darkness!** 🎨
