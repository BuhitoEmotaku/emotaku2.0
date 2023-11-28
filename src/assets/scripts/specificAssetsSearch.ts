export default function specificAssetsSearch(assetChosen: any) {
  let assets: Record<string, { default: string }> = {};
  switch (assetChosen) {
    case "emoStickers":
      assets = import.meta.glob('@/assets/images/emotakuStickersGifs/emo/*', { eager: true });
      break;
    case "otakuStickers":
      assets = import.meta.glob('@/assets/images/emotakuStickersGifs/otaku/*', { eager: true });
      break;
      case "speedCubing":
      assets = import.meta.glob('@/assets/images/speedCubing/*', { eager: true });
      break;
      case "electronic":
      assets = import.meta.glob('@/assets/images/electronic/*', { eager: true });
      break;
  }
  const allFilePaths: string[] = Object.values(assets).reduce<string[]>((acc, module) => {
    if (module.default) {
      acc.push(module.default);
    }
    return acc;
  }, []);

  return allFilePaths;
}