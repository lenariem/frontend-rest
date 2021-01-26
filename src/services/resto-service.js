export default class RestoService{
    /* _apiBase = 'http://localhost:5000' */
    _apiBase = 'https://backend-rest-react.herokuapp.com'

    async getResource(url) {
        const urlToSee = `${this._apiBase}${url}`
        console.log("url:" + urlToSee)
        
        const res = await fetch(urlToSee)
        
            
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + 
                `, received ${res.status}`)
        }
        return await res.json()
    }

    async getMenuItems () {
        return await this.getResource('/menu/')
    }

    async getOrdersItems () {
        return await this.getResource('/orders/')
    }

    async getItem(id) {
        const res = await this.getResource('/menu/')
        console.log(res);
        const item = res.find( (el) => {
            console.log(`el.id: ${el.id}, id: ${id}`)
            return el.id === +id
        }) 
        console.log(item)
        return item
    }


    async setOrder(order, totalPrice) {
        /* const number = await this.getOrderNumber() */
        
        const now = new Date()
        const toDate = date => {
            return new Intl.DateTimeFormat('de-DE', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(date)
        }
        const newOrder = {
            order: order,
            totalPrice: totalPrice,
            date: toDate(now)
        }
        const response = await fetch(`${this._apiBase}/orders/`, {
            method: 'POST', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
        
        if (!response.ok){
            throw new Error('json error')
        }

        /* return Promise.resolve() */

    }

    /* async getOrderNumber(){
        const res = await this.getResource('/orders/')
        console.log(res)
        const orderNumber = res.length+1
        return orderNumber
    } */
}