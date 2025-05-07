export const getCustomerTagSocket = (ipAddress: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${ipAddress}/ws`)

    ws.onopen = () => {
      ws.send('tags')
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

export const getCustomerBiometrySocket = (
  ipAddress: string,
  fingerId: number,
): Promise<number> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${ipAddress}/ws`)

    ws.onopen = () => {
      ws.send(`fingerid{${fingerId}}`)
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
