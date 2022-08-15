import { useState, useContext, useCallback } from "react";
import { getSearchUser } from "./SearchPageAPI";
import { LoginedUserContext } from "../../contexts/LoginedUserContext";
import styles from "./searchPage.module.css";
import HeaderForm from "../../components/molecules/HeaderForm/HeaderForm";
import BottomNavigateBar from "../../components/molecules/BottomNavigateBar/BottomNavigateBar";
import SearchCard from "../../components/molecules/SearchCard/SearchCard";

function SearchPage() {
  const [searchUser, setSeacrhUser] = useState(null);
  const [keyword, setkeyword] = useState("");
  const { user } = useContext(LoginedUserContext);
  const handleInputText = useCallback((event) => {
    let keyword = event.target.value;
    if (!event.target.value) {
      setSeacrhUser(null);
      return;
    }
    setkeyword(keyword);
    getSearchUser(user.token, keyword, setSeacrhUser);
  });
  return (
    <section>
      <h2 className="a11y-hidden">유저 검색</h2>
      <HeaderForm backButton={true} input={true} onInput={handleInputText} />
      <div className="wrapper-contents">
        <ul className={styles["container-users"]}>
          {searchUser &&
            searchUser.map((user) => {
              return (
                <li key={user._id}>
                  <SearchCard user={user} keyword={keyword} />
                </li>
              );
            })}
        </ul>
      </div>
      <BottomNavigateBar />
    </section>
  );
}

export default SearchPage;
