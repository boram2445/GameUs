import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleImageSize } from "../../common/ImageResize";
import { uploadImage } from "../../common/ImageUpload";
import { getPostData, editPostData } from "./PostEditPageAPI";
import HeaderForm from "../../components/modules/HeaderForm/HeaderForm";
import UploadForm from "../../components/organisms/UploadForm/UploadForm";
import { LoginedUserContext } from "../../contexts/LoginedUserContext";

function UploadPage() {
  let { postId } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const { user } = useContext(LoginedUserContext);

  useEffect(() => {
    getPostData(user.token, postId, setText, setImages);
  }, [postId]);

  //이미지 업로드
  async function handleuploadImages(images) {
    const imageArr = [];
    for (let file of images) {
      if (file.data) {
        const resizedImage = await handleImageSize(file.data);
        imageArr.push(await uploadImage(resizedImage));
      } else {
        imageArr.push(file.src);
      }
    }
    return imageArr.join(",");
  }

  //업로드 버튼
  async function handleUploadButton() {
    const imageNames = await handleuploadImages(images);
    await editPostData(user.token, postId, imageNames, text);
    navigate(`/profile/${user.accountname}`);
  }

  return (
    <section>
      <h2 className="a11y-hidden">상품 등록 페이지</h2>
      <HeaderForm
        backButton={true}
        button="업로드"
        onClick={handleUploadButton}
        active={text && true}
      />
      <div className="wrapper-contents">
        <UploadForm
          images={images}
          setText={setText}
          setImages={setImages}
          text={text}
        />
      </div>
    </section>
  );
}

export default UploadPage;
