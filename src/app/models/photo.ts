export class Photo {
    image
    name: string = ''
    URL: string
    constructor(image, name) {
        this.image = image
        this.name = name;
    }
}