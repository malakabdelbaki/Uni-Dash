import styled from "styled-components"

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
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoUni>Uni</LogoUni>
        <LogoDash>Dash</LogoDash>
      </LogoContainer>
      <HeaderRight>
        <NavButton onClick={() => window.location.href = "/restaurants"}>
          Restaurants
        </NavButton>
        <NavButton onClick={() => window.location.href = "/orders"}>
          My Orders
        </NavButton>
        <img src="/logo.png" alt="GIU Logo" width="200" height="40" />
      </HeaderRight>
    </HeaderContainer>
  )
}
