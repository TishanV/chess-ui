import React from "react"
import "../assets/css/pgn.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { popup } from "./store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fenOfGameState, pgnOfGame } from "./store/pgn.selectors";

function PGNPage() {
  const [currentPopup, setPopup] = useRecoilState(popup);
  const pgn = useRecoilValue(pgnOfGame);
  const fen = useRecoilValue(fenOfGameState);
  return currentPopup == "pgn" ? (
    <div className="pgn-page">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            <b>FEN:</b>
          </Form.Label>
          <Form.Control size="sm" type="text" value={fen} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <b>PGN:</b>
          </Form.Label>
          <Form.Control size="sm" as="textarea" rows={9} value={pgn} />
        </Form.Group>
      </Form>
      <Button onClick={(_) => setPopup("")}>Close</Button>
    </div>
  ) : null;
}

export { PGNPage };
