// Minimal shim — react-simple-maps ships no types and @types/react-simple-maps
// is stricter than the existing usage in app/villas. Treated as `any`, which
// matches how this code was already being compiled.
declare module 'react-simple-maps'
