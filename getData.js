const apiHost = 'http://ankkajahti.markl.fi';

export default {

    async fetchSigtings() {
        const res = await fetch(apiHost + '/sightings');
        const json = await res.json();
        var obj = json;
        obj.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        return obj.reverse();
    },

    async fetchSpecies() {
        const res = await fetch(apiHost + '/species');
        const json = await res.json();
        var obj = json;

        obj.sort(function (a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        })

        return obj;
    },
    async postSighting(data) {
        const res = await fetch(apiHost + '/sightings', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return res;
    }
};