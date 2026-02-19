import dlib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "models")

_face_detector = None
_shape_predictor = None
_face_rec_model = None


def load_models():
    global _face_detector, _shape_predictor, _face_rec_model

    if _face_detector is None:
        _face_detector = dlib.get_frontal_face_detector()

    if _shape_predictor is None:
        _shape_predictor = dlib.shape_predictor(
            os.path.join(MODEL_DIR, "shape_predictor_68_face_landmarks.dat")
        )

    if _face_rec_model is None:
        _face_rec_model = dlib.face_recognition_model_v1(
            os.path.join(MODEL_DIR, "dlib_face_recognition_resnet_model_v1.dat")
        )


def get_models():
    load_models()
    return _face_detector, _shape_predictor, _face_rec_model
