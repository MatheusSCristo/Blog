const getPostedTime = (time: Date | undefined | string) => {
    if (time) {
        const date = Date.now()
        let res = 0
        if (time instanceof Date) {
            res = ((date - time.getTime()) / 60000)
        }
        else {
            res = (date - Date.parse(time)) / 60000
        }
        if (res.toFixed(0) === '0') {
            return 'agora mesmo.'
        }
        else if (res.toFixed(0) === '1') {
            return '1 minuto atrás'
        }
        else if (res >= 1 && res < 60) {
            return `${res.toFixed(0)} minutos atrás.`
        }
        else if (res > 60 && res < 1440) {
            return `${(res / 60).toFixed(0)} horas atrás.`
        }
        else if (res > 1440 && res < 2880) {
            return '1 dia atrás.'
        }
        else {
            return `${(res / 1440).toFixed(0)} dias atrás.`
        }
    }

}

export default getPostedTime