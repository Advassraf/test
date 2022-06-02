import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";


const UserList = ({ users, isLoading, onScrollEnd }) => {
  const [hoveredUserId, setHoveredUserId] = useState();

  const [filterCountry, setFilterCountry] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const getCountryList = (value, isChecked) => {

    let ls = [];
    filterCountry.forEach((f) => {
      if (f == value) return;      
      ls.push(f);
    });
    if (isChecked) {
      ls.push(value);
    }
    setFilterCountry(ls);
  };

  const clickFavorite = (user) => {
    user.favorite = !user.favorite;
    if (user.favorite)
      localStorage.setItem(user.login.username,'true');
    else
      localStorage.removeItem(user.login.username);
  };

  const infintyScroll = (e) => {
    let element = e.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight){
      console.log("end");
      onScrollEnd && onScrollEnd()
    }
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={getCountryList} />
        <CheckBox value="AU" label="Australia" onChange={getCountryList} />
        <CheckBox value="CA" label="Canada" onChange={getCountryList} />
        <CheckBox value="DE" label="Germany" onChange={getCountryList} />
        <CheckBox value="DK" label="Denmark" onChange={getCountryList} />
      </S.Filters>
      <S.List onScroll={infintyScroll}>
        {users.filter((user) => {
          if (filterCountry.length == 0) return true;
          if (filterCountry.includes(user.nat)) return true;
          return false;
        }).map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper onClick={() => clickFavorite(user)} isVisible={user.favorite || index === hoveredUserId}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
