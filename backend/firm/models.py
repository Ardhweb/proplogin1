from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Organization(models.Model):
    user = models.ForeignKey(User,related_name="firm_user", on_delete=models.CASCADE)
    firm_name = models.CharField(max_length=50,blank=False, null=False,verbose_name="firm name")
    tax_id = models.CharField(max_length=50,blank=False, null=False)
    gstin = models.CharField(max_length=15, unique=True, blank=False)
    address = models.TextField(blank=False,null=False)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)