const testEmail = email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)

console.log(testEmail("marcus.migotti@gmx.net"))
