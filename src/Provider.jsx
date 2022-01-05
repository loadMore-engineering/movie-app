/* eslint-disable react/prop-types */
import { QueryClientProvider } from 'react-query'
import queryClient from 'lib/react-query'

export default function Provider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
