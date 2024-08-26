class ImageLoader {

    static loadedImages: { [key: string]: HTMLImageElement } = {};

    static loadSRCImage(src: string) {
        if (!ImageLoader.loadedImages[src]) {
            return ImageLoader.loadedImages[src];
        }
        return  ImageLoader.loadedImages[src];
    }
}
