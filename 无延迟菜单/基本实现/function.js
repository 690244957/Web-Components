function vector(a, b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

function vectorProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y
}

function sameSign(a, b) {
    return (a ^ b) >= 0
}

function isPointInTrangle(p, a, b, c) {
    const pa = vector(p, a)
    const pb = vector(p, b)
    const pc = vector(p, c)

    const t1 = vectorProduct(pa, pb)
    const t2 = vectorProduct(pb, pc)
    const t3 = vectorProduct(pc, pa)

    return sameSign(t1, t2) && sameSign(t2, t3)
}

function needDelay(elem, leftCorner, curMousePos) {
    const rect = elem.getBoundingClientRect();
    const offset = {
        top: rect.top,
        left: rect.left
    }
    const topLeft = {
        x: offset.left,
        y: offset.top
    }
    const bottomLeft = {
        x: offset.left,
        y: offset.top + elem.offsetHeight

    }
    return isPointInTrangle(curMousePos, leftCorner, topLeft, bottomLeft)
}