import * as React from "react"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import Stack from "@mui/material/Stack"
import { useRouter } from 'next/router'

type Page = 'buy' | 'pool' | 'holdings'
const NavigationContext = React.createContext({
    page: 'buy' as Page,
    setPage: (p: Page) => {}
})
export const useNavigationContext = () => React.useContext(NavigationContext)

export const ControlsProvider: React.FC = ({children}) => {
    const [page, setPage] = React.useState<Page>("buy")

    return <NavigationContext.Provider value={{page,setPage}}>
        {children}
    </NavigationContext.Provider>
}



export const Controls = (props: { onUpdate: () => void}) => {
  const router = useNavigationContext()

  return <Stack direction="row" alignItems="center" justifyContent="center">
    <ToggleButtonGroup
      color="primary"
      value={router.page}
      exclusive
    >
      <ToggleButton onClick={() => {
        router.setPage("buy");
        props.onUpdate()
      }} value="buy">Buy</ToggleButton>
      <ToggleButton onClick={() => {
        router.setPage("pool");
        props.onUpdate()
      }} value="pool">Pool</ToggleButton>
      <ToggleButton onClick={() => {
        router.setPage("holdings");
        props.onUpdate()
      }} value="holdings">Holdings</ToggleButton>
    </ToggleButtonGroup>
  </Stack>
}
