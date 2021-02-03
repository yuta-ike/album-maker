import firebase from "./firebase"

const authProvider = new firebase.auth.OAuthProvider('microsoft.com')
authProvider.setCustomParameters({
  // prompt: "consent",
})
authProvider.addScope('Files.Read')
authProvider.addScope('Files.Read.All')

export default authProvider