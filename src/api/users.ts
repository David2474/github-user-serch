const token = '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';
const API = 'https://api.github.com/users/'

export const requestUser = async (user: string) =>{ 
 
    const response = await fetch(`${API}${user}`, {
        headers: { 
          'Authorization': `token ${token}`
        }
    })
    
    return response.json();
}
