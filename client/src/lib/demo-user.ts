export function getDemoUserId() {
  return (
    process.env.NEXT_PUBLIC_DEMO_USER_ID ??
    process.env.NEXT_PUBLIC_demo_user_id ??
    ""
  ).trim();
}

export function isDemoUserId(userId: string | number | undefined | null) {
  const demoUserId = getDemoUserId();

  if (!demoUserId || userId == null) {
    return false;
  }

  return String(userId) === String(demoUserId);
}
