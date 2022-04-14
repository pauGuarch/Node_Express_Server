export default function actors(data) {

    let _actors = {}
    _actors.id = data.id;
    _actors.actors = data.actors;
    
    return _actors;
}