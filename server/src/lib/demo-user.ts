export function getDemoUserId() {
  return (process.env.demo_user_id ?? process.env.DEMO_USER_ID ?? "").trim();
}

export function isDemoUserId(userId: string | number | undefined | null) {
  const demoUserId = getDemoUserId();

  if (!demoUserId || userId == null) {
    return false;
  }

  return String(userId) === String(demoUserId);
}
