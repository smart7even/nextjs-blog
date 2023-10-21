export function formatLink(link: string): string {
    let formatedLink = link

    if (!formatedLink.startsWith('http://') && !formatedLink.startsWith('https://')) {
        formatedLink = 'http://' + formatedLink
    }

    return formatedLink
}