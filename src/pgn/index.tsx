import React from "react"
import { useRecoilState } from "recoil";
import { popup } from "../store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fenOfGameState, pgnOfGame } from "../store/pgn.selectors";
import { useRef } from "react";
import { pgnStyle } from "./style";

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
      <Button onClick={(_) => loadPGN(pgnRef.current?.value ?? "")}>
        Load PGN
      </Button>
      <Button onClick={(_) => loadFEN(fenRef.current?.value ?? "")}>
        Load FEN
      </Button>
      <Button onClick={(_) => setPopup("")}>Close</Button>
    </div>
  ) : null;
}

export { PGNPage };
