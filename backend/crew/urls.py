from rest_framework.routers import DefaultRouter

from .views import NaveViewSet, TripulanteViewSet

router = DefaultRouter()
router.register('naves', NaveViewSet)
router.register('tripulantes', TripulanteViewSet)

urlpatterns = router.urls
