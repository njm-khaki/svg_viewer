export function log(name: string) {
    console.log(`run ${name}`)
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`finish ${name}`)
    }
}