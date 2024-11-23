import { baseURL } from "."

export const registerAPI = async (postData) => {
    const response = await fetch(`${baseURL}/auth/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 
        },
        body: JSON.stringify(postData)
    })

    const res = await response.json()

    console.log('response',res)

    if(res.ok){
        return res.data
    }

    throw new Error('something went wrong.') 

}

export const loginAPI = async(postData) => {
    const response = await fetch(`${baseURL}/auth/login` , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })

    const res = await response.json()
    // console.log('response',res)
    return res
}

// export const AccessToken = sessionStorage.getItem('user')

export const verifyToken = async(accessToken) => {
    // console.log(accessToken)
    const response = await fetch(`${baseURL}/token/verify/` , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: accessToken})
    })

    const res = await response.json()
    // console.log(response.status)
    if(res.detail){
        return false
    }
    // console.log('response',res)
    return true
}

