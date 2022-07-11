import React from "react"
import { useRecoilState } from "recoil";
import { popup } from "../store";
import { Button } from "../components/buttons";
import Form from "react-bootstrap/Form";
import { fenOfGameState, pgnOfGame } from "../store/pgn.selectors";
import { useRef } from "react";
import { pgnStyle, footerStyle } from "./style";

function PGNPage() {
  const [currentPopup, setPopup] = useRecoilState(popup);
  const [pgn, loadPGN] = useRecoilState(pgnOfGame);
  const [fen, loadFEN] = useRecoilState(fenOfGameState);

  const pgnRef = useRef<HTMLTextAreaElement>(null);
  const fenRef = useRef<HTMLInputElement>(null);
  return currentPopup == "pgn" ? (
    <div style={pgnStyle}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            <b>FEN:</b>
          </Form.Label>
          <Form.Control ref={fenRef} size="sm" type="text" defaultValue={fen} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <b>PGN:</b>
          </Form.Label>
          <Form.Control
            ref={pgnRef}
            size="sm"
            as="textarea"
            rows={9}
            defaultValue={pgn}
          />
        </Form.Group>
      </Form>
      <div style={footerStyle}>
        <Button.PRIMARY
          onClick={(_) => loadPGN(pgnRef.current?.value ?? "")}
          value="Load PGN"
        />
        <Button.PRIMARY
          onClick={(_) => loadFEN(fenRef.current?.value ?? "")}
          value="Load FEN"
        />
        <Button.SECONDARY onClick={(_) => setPopup("")} value="Close" />
      </div>
    </div>
  ) : null;
}

export { PGNPage };
