export default function useAssets(asset: string) {
  const assets: Record<string, { default: string }> = import.meta.glob('@/assets/**', { eager: true });
  return assets[asset].default

}