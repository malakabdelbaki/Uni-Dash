import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth" 

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

export const LogoUni = styled.span`
  font-family: 'Nunito-Bold', sans-serif;
  font-size: 40px;
  color: #d6212a;
`

export const LogoDash = styled.span`
  font-family: 'Nunito-Bold', sans-serif;
  font-size: 30px;
  color: #d79a27;
  margin-left: 6px;
  margin-bottom: 4px;
`

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const NavButton = styled.button`
  background-color: #d79a27;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c08a1f;
  }
`

export default function Header() {
  const { user } = useAuth()
  const { restaurantId } = useParams()
  const navigate = useNavigate()
console.log("id: " + restaurantId)
  const handleRestaurantClick = () => {
    if (user?.role === "restaurant_owner" && restaurantId) {
      navigate(`/restaurants/${restaurantId}`)
    } else {
      navigate("/restaurants")
    }
  }
  const handleSecondButtonClick = () => {
    if (user?.role === "restaurant_owner" && restaurantId) {
      navigate(`/orders/restaurant/${restaurantId}`)
    } else {
      navigate("/myorders")
    }
  }

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoUni>Uni</LogoUni>
        <LogoDash>Dash</LogoDash>
      </LogoContainer>
      <HeaderRight>
        <NavButton onClick={handleRestaurantClick}>
          Restaurants
        </NavButton>
        <NavButton onClick={handleSecondButtonClick}>
          {user?.role === "restaurant_owner" ? "Incoming Orders" : "My Orders"}
        </NavButton>
        <img src="/logo.png" alt="GIU Logo" width="200" height="40" />
      </HeaderRight>
    </HeaderContainer>
  )
}
