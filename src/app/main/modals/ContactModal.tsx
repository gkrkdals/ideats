import Modal, {ModalActions, ModalContent, ModalProps, ModalTitle} from "@/components/modal/Modal";
import FormControl, {FormControlTextArea, FormLabel} from "@/components/atom/FormControl";
import {ReactNode, useEffect, useRef, useState} from "react";
import axios from "axios";

interface ContactModalProps extends ModalProps {
  onSuccess: () => void;
}

interface EmailDto {
  projectName: string;
  projectContents: string;
  ref: string;
  name: string;
  email: string;
  tel: string;
}

const Wrapper = ({children}: { children?: ReactNode }) => <div className='mb-3'>{children}</div>;

export default function ContactModal(props: ContactModalProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [emailData, setEmailData] = useState<EmailDto>({
    projectName: '',
    projectContents: '',
    ref: '',
    name: '',
    email: '',
    tel: ''
  });

  const set = (key: keyof EmailDto, value: string) => setEmailData({ ...emailData, [key]: value });

  async function sendEmail() {
    props.onSuccess();
    await axios.post("/api/client/email", emailData);
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.setAttribute(
        'placeholder',
        '장르: TVCF/웹드라마/홍보, 프로모션/바이럴/촬영문의/편집문의\n\n내용: 제작하고자 하는 영상의 내용을 기재해 주세요'
      );
    }
  });

  return (
    <Modal open={props.open} setOpen={props.setOpen} width={600}>
      <ModalTitle>
        P R O D U C T I O N
      </ModalTitle>
      <ModalContent>
        <div
          style={{
            fontSize: "9pt"
          }}
        >
          <Wrapper>
            <FormLabel htmlFor='projectName'>프로젝트 명</FormLabel>
            <FormControl id='projectName' value={emailData.projectName} onChange={e => set('projectName', e.target.value)} />
          </Wrapper>
          <Wrapper>
            <FormLabel htmlFor='projectContents'>프로젝트 내용</FormLabel>
            <FormControlTextArea
              ref={textAreaRef}
              id='projectContents'
              rows={6}
              value={emailData.projectContents}
              onChange={e => set('projectContents', e.target.value)}
            />
          </Wrapper>
          <Wrapper>
            <FormLabel htmlFor='ref'>참고영상</FormLabel>
            <FormControl
              id='ref'
              placeholder='참고할만한 영상의 링크 주소를 적어주시면 더 정확한 고객님의 니즈를 파악하겠습니다.'
              onChange={e => set('ref', e.target.value)}
            />
          </Wrapper>
          <Wrapper>
            <FormLabel htmlFor='name'>담당자 성함</FormLabel>
            <FormControl id='name' value={emailData.name} onChange={e => set('name', e.target.value)} />
          </Wrapper>
          <Wrapper>
            <FormLabel htmlFor='email'>이메일</FormLabel>
            <FormControl id='email' type='email' value={emailData.email} onChange={e => set('email', e.target.value)} />
          </Wrapper>
          <Wrapper>
            <FormLabel htmlFor='tel'>전화번호</FormLabel>
            <FormControl id='tel' type='tel' value={emailData.tel} onChange={e => set('tel', e.target.value)} />
          </Wrapper>
        </div>
      </ModalContent>

      <ModalActions>
        <button className='btn btn-primary px-4' onClick={sendEmail}>
          S E N D
        </button>
      </ModalActions>
    </Modal>
  )
}