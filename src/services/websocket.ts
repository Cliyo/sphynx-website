export const getCustomerTagSocket = (ipAddress: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${ipAddress}/ws`)

    ws.onopen = () => {
      ws.send('tag')
    }

    ws.onmessage = (event) => {
      resolve(event.data)
      ws.close()
    }

    ws.onerror = (error) => {
      reject(new Error(`WebSocket error: ${error}`))
      ws.close()
    }
  })
}
