import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  BoxProps,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ShoppingIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import "../Styles/components/header.css";

interface HeaderProps extends BoxProps {
  searchValue?: string;
  onChangeSearch: (value: string) => void;
}

const Header = React.forwardRef(
  (
    { onChangeSearch, searchValue, ...rest }: HeaderProps,
    headerRef
  ): JSX.Element => {
    const navigate = useNavigate();
    const handleSearch = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChangeSearch(newValue);
      },
      [onChangeSearch]
    );

    const handleNavigateBasket = React.useCallback(() => {
      navigate("/basket");
    }, [navigate]);

    const handleNavigateHome = React.useCallback(() => {
      navigate("/");
    }, [navigate]);

    return (
      <Box
        component={AppBar}
        ref={headerRef}
        height="4rem"
        position="fixed"
        {...rest}
      >
        <Toolbar className="Toolbar">
          <Box display="flex" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleNavigateHome}
            >
              <HomeIcon />
            </IconButton>
            <div className="SearchFieldWrapper">
              <SearchIcon className="SearchIcon" />
              <InputBase
                className="SearchInput"
                placeholder="Search…"
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
          </Box>
          <Box
            component={IconButton}
            size="large"
            edge="start"
            color="inherit"
            onClick={handleNavigateBasket}
          >
            <ShoppingIcon />
          </Box>
        </Toolbar>
      </Box>
    );
  }
);

export default React.memo(Header);
