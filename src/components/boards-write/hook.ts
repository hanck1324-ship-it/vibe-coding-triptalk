"use client";

import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD, UPLOAD_FILE } from "./queries";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";

interface IAddress {
  address: string;
  zonecode: string;
}

export const useBoardWrite = (isEdit: boolean = false) => {
  const router = useRouter();
  const params = useParams();
  const boardId = params?.boardId as string;

  // 필수 입력값 상태
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 에러 메시지 상태
  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  // 선택 입력값 상태
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeUrlError, setYoutubeUrlError] = useState("");

  // UI 상태
  const [isActive, setIsActive] = useState(false);
  const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState("");

  // 이미지 상태
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);

  // 수정 모드일 때 기존 데이터 로드
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
    skip: !isEdit || !boardId,
  });

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (isEdit && data?.fetchBoard) {
      const board = data.fetchBoard;
      setTitle(board.title || "");
      setContents(board.contents || "");
      setYoutubeUrl(board.youtubeUrl || "");
      setZipcode(board.boardAddress?.zipcode || "");
      setAddress(board.boardAddress?.address || "");
      setAddressDetail(board.boardAddress?.addressDetail || "");
    }
  }, [isEdit, data]);

  // GraphQL 뮤테이션
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  // 등록 버튼 활성화 조건 체크
  useEffect(() => {
    const isValid = 
      writer.trim() !== "" &&
      password.trim() !== "" &&
      title.trim() !== "" &&
      contents.trim() !== "";
    
    setIsActive(isValid);
  }, [writer, password, title, contents]);

  // 입력 핸들러
  const onChangeWriter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
    if (e.target.value.trim()) {
      setWriterError("");
    }
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.trim()) {
      setPasswordError("");
    }
  }, []);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setTitleError("");
    }
  }, []);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
    if (e.target.value.trim()) {
      setContentsError("");
    }
  }, []);

  const onChangeAddressDetail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  }, []);

  // 유튜브 URL 유효성 검증 함수
  const isValidYoutubeUrl = (url: string): boolean => {
    if (!url.trim()) return true; // 빈 값은 허용 (선택 필드)
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  };

  const onChangeYoutubeUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);

    // 유튜브 URL 유효성 검증 (값이 있을 때만)
    if (url.trim() && !isValidYoutubeUrl(url)) {
      setYoutubeUrlError('올바른 유튜브 URL 형식이 아닙니다. (예: https://www.youtube.com/watch?v=xxxxx)');
    } else {
      setYoutubeUrlError('');
    }
  }, []);

  // 이미지 업로드 핸들러
  const onChangeImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    // 최대 3개까지만
    const newFiles = fileArray.slice(0, 3 - imageFiles.length);
    
    // 미리보기 URL 생성
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    
    setImageFiles(prev => [...prev, ...newFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  }, [imageFiles.length]);

  // 이미지 삭제 핸들러
  const onDeleteImage = useCallback((index: number) => {
    // 미리보기 URL 해제
    URL.revokeObjectURL(previewUrls[index]);
    
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  }, [previewUrls]);

  // 우편번호 검색 모달
  const handleTogglePostcodeModal = useCallback(() => {
    setIsPostcodeModalOpen((prev) => !prev);
  }, []);

  const handleCompletePostcode = useCallback((data: IAddress) => {
    console.log("주소 검색 완료:", data);
    setZipcode(data.zonecode);
    setAddress(data.address);
    setIsPostcodeModalOpen(false);
    
    // DaumMap 컴포넌트에서 자동으로 좌표를 설정해줌
    // onCoordinatesChange 콜백을 통해 handleSetCoordinates가 호출됨
  }, []);

  // 위도/경도 설정 핸들러
  const handleSetCoordinates = useCallback((lat: string, lng: string) => {
    console.log("좌표 설정:", lat, lng);
    setLatitude(lat);
    setLongitude(lng);
  }, []);

  // 알림 모달
  const handleOk = () => {
    setIsAlertModalOpen(false);
    if (modalContents.includes("등록")) {
      // 게시물 목록 페이지로 이동 (캐시가 이미 갱신됨)
      router.push("/boards");
      // 페이지 새로고침으로 최신 데이터 확인
      router.refresh();
    } else if (modalContents.includes("수정")) {
      router.push(`/boards/${boardId}`);
    }
  };


  // 유효성 검증
  const validateInputs = (): boolean => {
    let isValid = true;

    if (!writer.trim() && !isEdit) {
      setWriterError("작성자를 입력해주세요.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    }

    if (!title.trim()) {
      setTitleError("제목을 입력해주세요.");
      isValid = false;
    }

    if (!contents.trim()) {
      setContentsError("내용을 입력해주세요.");
      isValid = false;
    }

    return isValid;
  };

  // 게시글 작성
  const onClickSubmit = async () => {
    if (!validateInputs()) return;

    try {
      const createBoardInput: any = {
        writer,
        password,
        title,
        contents,
      };

      // 선택 필드가 있을 경우에만 추가
      if (youtubeUrl.trim()) {
        createBoardInput.youtubeUrl = youtubeUrl;
      }

      if (zipcode || address || addressDetail) {
        createBoardInput.boardAddress = {
          zipcode: zipcode || "",
          address: address || "",
          addressDetail: addressDetail || "",
        };
      }

      const result = await createBoard({
        variables: { createBoardInput },
        // 게시물 목록 캐시 갱신
        refetchQueries: [
          {
            query: FetchBoardsDocument,
            variables: { page: 1 },
          },
        ],
      });

      if (result.data?.createBoard) {
        setModalContents("게시글이 등록되었습니다.");
        setIsAlertModalOpen(true);
      }
    } catch (error: any) {
      console.error("게시글 작성 에러:", error);
      setModalContents(error.message || "게시글 등록에 실패했습니다.");
      setIsAlertModalOpen(true);
    }
  };

  // 게시글 수정
  const onClickUpdate = async () => {
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      return;
    }

    if (!title.trim()) {
      setTitleError("제목을 입력해주세요.");
      return;
    }

    if (!contents.trim()) {
      setContentsError("내용을 입력해주세요.");
      return;
    }

    try {
      const updateBoardInput: any = {
        title,
        contents,
      };

      // 선택 필드가 있을 경우에만 추가
      if (youtubeUrl.trim()) {
        updateBoardInput.youtubeUrl = youtubeUrl;
      }

      if (zipcode || address || addressDetail) {
        updateBoardInput.boardAddress = {
          zipcode: zipcode || "",
          address: address || "",
          addressDetail: addressDetail || "",
        };
      }

      const result = await updateBoard({
        variables: {
          boardId,
          password,
          updateBoardInput,
        },
      });

      if (result.data?.updateBoard) {
        setModalContents("게시글이 수정되었습니다.");
        setIsAlertModalOpen(true);
      }
    } catch (error: any) {
      console.error("게시글 수정 에러:", error);
      const errorMessage = error.message || "게시글 수정에 실패했습니다.";
      
      if (errorMessage.includes("password")) {
        setModalContents("비밀번호가 일치하지 않습니다.");
      } else {
        setModalContents(errorMessage);
      }
      setIsAlertModalOpen(true);
    }
  };

  return {
    // 입력값
    writer,
    password,
    title,
    contents,
    zipcode,
    address,
    addressDetail,
    latitude,
    longitude,
    youtubeUrl,
    
    // 에러 메시지
    writerError,
    passwordError,
    titleError,
    contentsError,
    youtubeUrlError,
    
    // 입력 핸들러
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContents,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    
    // 이미지
    imageFiles,
    previewUrls,
    onChangeImages,
    onDeleteImage,
    
    // 주소 검색
    isPostcodeModalOpen,
    handleTogglePostcodeModal,
    handleCompletePostcode,
    handleSetCoordinates,
    
    // 등록/수정
    onClickSubmit,
    onClickUpdate,
    isActive,
    data,
    
    // 알림 모달
    isAlertModalOpen,
    modalContents,
    handleOk,
  };
};

