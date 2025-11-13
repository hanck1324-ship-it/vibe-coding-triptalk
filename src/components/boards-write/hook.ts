"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from "./queries";

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
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeUrlError, setYoutubeUrlError] = useState("");

  // UI 상태
  const [isActive, setIsActive] = useState(false);
  const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState("");

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
  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
    if (e.target.value.trim()) {
      setWriterError("");
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.trim()) {
      setPasswordError("");
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setTitleError("");
    }
  };

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
    if (e.target.value.trim()) {
      setContentsError("");
    }
  };

  const onChangeAddressDetail = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  // 유튜브 URL 유효성 검증 함수
  const isValidYoutubeUrl = (url: string): boolean => {
    if (!url.trim()) return true; // 빈 값은 허용 (선택 필드)
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  };

  const onChangeYoutubeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    
    // 유튜브 URL 유효성 검증 (값이 있을 때만)
    if (url.trim() && !isValidYoutubeUrl(url)) {
      setYoutubeUrlError('올바른 유튜브 URL 형식이 아닙니다. (예: https://www.youtube.com/watch?v=xxxxx)');
    } else {
      setYoutubeUrlError('');
    }
  };

  // 우편번호 검색 모달
  const handleTogglePostcodeModal = () => {
    setIsPostcodeModalOpen((prev) => !prev);
  };

  const handleCompletePostcode = (data: IAddress) => {
    setZipcode(data.zonecode);
    setAddress(data.address);
    setIsPostcodeModalOpen(false);
  };

  // 알림 모달
  const handleOk = () => {
    setIsAlertModalOpen(false);
    if (modalContents.includes("등록")) {
      router.push("/boards");
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
    
    // 주소 검색
    isPostcodeModalOpen,
    handleTogglePostcodeModal,
    handleCompletePostcode,
    
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

