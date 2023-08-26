import Config from '@/settings'

const AccessTokenKey = Config.AccessTokenKey
const RefreshTokenKey = Config.RefreshTokenKey
// ========== Token 相关 ==========

export function getAccessToken() {
  return localStorage.getItem(AccessTokenKey)
}

export function getRefreshToken() {
  return localStorage.getItem(RefreshTokenKey)
}

export function setToken(token) {
  localStorage.setItem(AccessTokenKey, token.access_token)
  localStorage.setItem(RefreshTokenKey, token.refresh_token)
}

export function removeToken() {
  localStorage.removeItem(AccessTokenKey)
  localStorage.removeItem(RefreshTokenKey)
}
