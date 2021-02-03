const swrConfig = {
  shouldRetryOnError: false,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}

export default swrConfig

export const neverRevalidateSWRConfig = {
  revalidateOnFocus: false,
  revalidateOnMount: true,
  revalidateOnReconnect: false,
}