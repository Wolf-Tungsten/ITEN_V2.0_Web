
export function getCookie(name)
{
    try {
        let cookie = JSON.parse(document.cookie);
        return cookie[name];
    }
    catch(e) {
        document.cookie = JSON.stringify({});
    }
}

export function setCookie(name, value) {
    let cookie = JSON.parse(document.cookie);
    cookie[name] = value;
    document.cookie = JSON.stringify(cookie);
}
