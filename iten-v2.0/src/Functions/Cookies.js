
export function getAccessToken()
{
   return localStorage['iten_Access_token']
}

export function setAccessToken(token) {
    localStorage['iten_Access_token'] = token
}
