import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth" 

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
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

const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #000000;
  }
`

export default function Header() {
  const { user } = useAuth()
  const { restaurantId } = useParams()
  const navigate = useNavigate()

  console.log("Header Debug:", {
    user,
    restaurantId,
    token: localStorage.getItem('token'),
    userData: localStorage.getItem('user')
  })

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

  const handleProfileClick = () => {
    console.log("Profile click - User:", user)
    if (!user) {
      console.log("No user found, redirecting to login")
      navigate("/login")
      return
    }
    
    if (user.role === "restaurant_owner") {
      navigate("/profile/restaurant")
    } else {
      navigate("/profile/student")
    }
  }

  return (
    <HeaderContainer>
      <LogoContainer>
        <ProfileButton onClick={handleProfileClick} title="Profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 12C14.8 12 17 9.8 17 7s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5Z" />
            <path d="M12 14.5C7 14.5 3 17.4 3 21c0 .6.4 1 1 1h16c.6 0 1-.4 1-1 0-3.6-4-6.5-9-6.5Z" />
          </svg>
        </ProfileButton>
        <LogoUni>Uni</LogoUni><LogoDash>Dash</LogoDash>
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
