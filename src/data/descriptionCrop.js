export function descriptionCrop(description) {
    if (description.split(' ').length > 30) {
        return description.split(' ').slice(0, 30).join(' ') + '...'
    } else return description
}
